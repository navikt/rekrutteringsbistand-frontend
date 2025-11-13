import{aE as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-BNj3Trp7.js";import{w as m,c as A}from"./ContextDecorators-kA7FkkqF.js";import{F as N,A as v}from"./FullførtStilling-Dg0h2awd.js";import{R as T}from"./GjenåpneStillingKnapp-BtoJyxVU.js";import{T as E}from"./TilgangskontrollForInnhold-C5r7Mt7o.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-dJsyfxMF.js";import"./OrganisasjonsnummerAlert-DA6HqLLK.js";import"./VStack-DI5FtL9d.js";import"./BasePrimitive-Cu5t_Mba.js";import"./List-Cr7cy7SP.js";import"./Link-Bn5t7p2T.js";import"./KandidatHendelseTag-CD3_3PBM.js";import"./Tag-QE-oNjx8.js";import"./ChatExclamationmark-DzcHPT0m.js";import"./FileXMark-DzHm9-jj.js";import"./Trash-By5WJppC.js";import"./HandShakeHeart-DIGmqrBd.js";import"./Calendar-B98hgnWw.js";import"./ThumbUp-KmzGg11Q.js";import"./Table-DXLxzRW2.js";import"./util-DoihbPMg.js";import"./parse-D07axElW.js";import"./getDefaultOptions-Db9cQ1D8.js";import"./parseISO-Dgrq-wQz.js";import"./index-DXeB4KUX.js";import"./index-B40KJ5b4.js";import"./isBefore-CkOQlVm0.js";import"./util-BlQdQcUP.js";import"./accordion-BgdK5xaA.js";import"./index-marfIXb0.js";import"./index-DVI_88JF.js";import"./index-Vg96uoPc.js";import"./ChevronDown-za9Zk1IQ.js";import"./Box-BMOlz61y.js";import"./Bell-DoEFl9r_.js";import"./PersonChat-Dev7hNKl.js";import"./Eye-SVjh7rNZ.js";import"./ProgressBar-DINjykrw.js";import"./EyeSlash-CZ_tElW-.js";import"./CircleSlash-CjPtn876.js";import"./Modal-7-gXuphO.js";import"./floating-ui.react-BgmN6yPa.js";import"./Date.Input-Gox3oCUD.js";import"./useFormField-Dq2bFYNe.js";import"./useControllableState-CDlVFmtE.js";import"./Modal.context-C8x_SuV6.js";import"./Checkbox-C9-9npKr.js";import"./Fieldset-Dfe2m9Ep.js";import"./Pencil-Scx6YnXg.js";import"./PersonbrukerTekst-8KbQj1N7.js";import"./ClockDashed-BqfI0IlS.js";import"./Tasklist-D_gnEMed.js";import"./ErrorBoundary-DxncHvT-.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
