import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-DGJZfRLj.js";import{w as d,c as D}from"./ContextDecorators-DXrom0v-.js";import{F as N,A as v}from"./FullførtStilling-D4SFpA2Z.js";import{R as T}from"./GjenåpneStillingKnapp-BF2DpXA0.js";import{T as A}from"./TilgangskontrollForInnhold-DVQLZTLp.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-QeYeky1X.js";import"./OrganisasjonsnummerAlert-CT28ABKE.js";import"./VStack--kEYkFg6.js";import"./BasePrimitive-Cf43sxsL.js";import"./List-1YVdWu8v.js";import"./Link-DVpjbSpT.js";import"./KandidatHendelseTag-D37_OMzx.js";import"./Tag-CtkeTXXx.js";import"./ChatExclamationmark-Dq2jWQU4.js";import"./FileXMark-wIy8EfzN.js";import"./Trash-U-agCtJj.js";import"./HandShakeHeart-IbTz3SXE.js";import"./Calendar-CQjYGR9z.js";import"./ThumbUp-D2ZhMt21.js";import"./Table-w6_jwB_N.js";import"./util-l964Anfk.js";import"./format-DIeaPe2D.js";import"./match-BV0xT-Zd.js";import"./parse-CicZeTJW.js";import"./getDefaultOptions-CDcTPqZg.js";import"./parseISO-CJfUdAZG.js";import"./util-RQAia1fF.js";import"./accordion-08v9Vggk.js";import"./index-B_TIbNs_.js";import"./index-BnZ52Ctg.js";import"./index-DIKWls8r.js";import"./ChevronDown-qHXczOAY.js";import"./Box-CJUyEqWE.js";import"./Bell-CQm8GjUt.js";import"./PersonChat-D39OB83z.js";import"./Eye-XmW4AzWL.js";import"./ProgressBar-CBm0eydA.js";import"./EyeSlash-D8QV4KxB.js";import"./CircleSlash-BPwuy2Hm.js";import"./Modal-Dm6USPJW.js";import"./floating-ui.react-BBlmzmSN.js";import"./Date.Input-BtSzc9Ln.js";import"./useFormField-lXpThh9F.js";import"./useControllableState-V_CYkDBC.js";import"./Modal.context-DMB1oKZj.js";import"./Checkbox-9NXZ9JCG.js";import"./Fieldset-lv69ua0k.js";import"./Pencil-qaBKci6s.js";import"./PersonbrukerTekst-BzB3nr4y.js";import"./ClockDashed-BnVJUn73.js";import"./Tasklist-CpWTd8V1.js";import"./ErrorBoundary-R0l9qVdF.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),m=I(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
