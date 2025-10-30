import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-Dn6oOtbf.js";import{w as m,c as D}from"./ContextDecorators-BSbBHpwK.js";import{F as N,A as v}from"./FullførtStilling-B0jDfO-b.js";import{R as T}from"./GjenåpneStillingKnapp-CK6OuvDy.js";import{T as A}from"./TilgangskontrollForInnhold-DTt6-1CH.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-dK394pnf.js";import"./OrganisasjonsnummerAlert-D5-jFYKp.js";import"./VStack-1Y06ajMB.js";import"./BasePrimitive-M-VNSZSQ.js";import"./List-Bu_qaqD6.js";import"./Link-DeUJpW5N.js";import"./KandidatHendelseTag-DVdlj2i_.js";import"./Tag-BaUOFaZU.js";import"./ChatExclamationmark-9Thb-iIS.js";import"./FileXMark-cXbFvwSu.js";import"./Trash-B9vT4zgD.js";import"./HandShakeHeart-rKAmRAyZ.js";import"./Calendar-CHtXvFtN.js";import"./ThumbUp-BGxaKFAm.js";import"./Table-By0dovrZ.js";import"./util-BLWTfEaX.js";import"./format-C0S4jMUI.js";import"./match-DH_fZqpI.js";import"./parse-VVjy0MJj.js";import"./getDefaultOptions-DBO-DaTO.js";import"./parseISO-Cf7-iP2x.js";import"./index-Cc-rxqI-.js";import"./index-B40KJ5b4.js";import"./isBefore-B9Mk30_B.js";import"./util-Bsw3rW9y.js";import"./accordion-Bmk_xv2b.js";import"./index-DAXO9QLD.js";import"./index-BnsJF-X4.js";import"./index-BIYPZ0Ft.js";import"./ChevronDown-n1n2toSX.js";import"./Box-7aq35ZMy.js";import"./Bell-PzNqdyOU.js";import"./PersonChat-zXcrBmO7.js";import"./Eye-BPw29m2B.js";import"./ProgressBar-s2D2Xjry.js";import"./EyeSlash-BtvXJJdr.js";import"./CircleSlash-CzbwozWE.js";import"./Modal-BVkvhY2h.js";import"./floating-ui.react-506kzj2V.js";import"./Date.Input-C-6OEEjw.js";import"./useFormField-CXUgeBOA.js";import"./useControllableState-CgPyIzFT.js";import"./Modal.context-3AglHSQc.js";import"./Checkbox-C-i3RhP1.js";import"./Fieldset-BsVvXV3w.js";import"./Pencil-C12a6eCX.js";import"./PersonbrukerTekst-DWKYaW-j.js";import"./ClockDashed-CTnsgftu.js";import"./Tasklist-DPefmmQO.js";import"./ErrorBoundary-Jhmlyk5M.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Jt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Jt as default};
