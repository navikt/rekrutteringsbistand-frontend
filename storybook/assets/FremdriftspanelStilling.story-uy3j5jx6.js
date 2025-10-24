import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-Bmd04qoj.js";import{w as m,c as D}from"./ContextDecorators-Dp7f3vyf.js";import{F as N,A as v}from"./FullførtStilling-De1LbzPF.js";import{R as T}from"./GjenåpneStillingKnapp-BhzdRULk.js";import{T as A}from"./TilgangskontrollForInnhold-DIs0h4Mx.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CILi37Ox.js";import"./OrganisasjonsnummerAlert-qG73dspB.js";import"./VStack-Bmjuwd_W.js";import"./BasePrimitive-CObubrVc.js";import"./List-CX9jJoyJ.js";import"./Link-Dq_6EONH.js";import"./KandidatHendelseTag-DHPlXU7s.js";import"./Tag-Cwnwrn3S.js";import"./ChatExclamationmark-vMNOebpR.js";import"./FileXMark-6G_R8yKn.js";import"./Trash-2kyLvZbY.js";import"./HandShakeHeart-CqxIf87G.js";import"./Calendar-BlxtcVi7.js";import"./ThumbUp-DzGKX53D.js";import"./Table-BLBNzfzr.js";import"./util-BFKdhQhL.js";import"./format-BVFeQIBq.js";import"./match-BYeHyply.js";import"./parse-BfVOmq8O.js";import"./getDefaultOptions-DDwblf9i.js";import"./parseISO-B_RBLHAP.js";import"./index-By3zFBwr.js";import"./index-B40KJ5b4.js";import"./isBefore-BXpbjGgC.js";import"./util-C80-radx.js";import"./accordion-BIxrA2MO.js";import"./index-CPr6Zf7K.js";import"./index-DpZD93U5.js";import"./index-BFY0-PV2.js";import"./ChevronDown-B7K84jA1.js";import"./Box-CpBs12vE.js";import"./Bell-DvbfctzC.js";import"./PersonChat-CCfPK046.js";import"./Eye-CF5hYpR8.js";import"./ProgressBar-OMPqvz48.js";import"./EyeSlash-DujXgbQU.js";import"./CircleSlash-B7WTUski.js";import"./Modal-BuCOX0ng.js";import"./floating-ui.react-Bc9TQ6nX.js";import"./Date.Input-Ck8k5Y1M.js";import"./useFormField-E1T9R7PV.js";import"./useControllableState-vvpRagwg.js";import"./Modal.context-D7HeWnaH.js";import"./Checkbox-DOPti6T0.js";import"./Fieldset-Bo5DQcYq.js";import"./Pencil-DDLA3mZu.js";import"./PersonbrukerTekst-B9VsABbc.js";import"./ClockDashed-DJsUspwA.js";import"./Tasklist-Brsjp1cv.js";import"./ErrorBoundary-Ap3JQ8dj.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Vt as default};
