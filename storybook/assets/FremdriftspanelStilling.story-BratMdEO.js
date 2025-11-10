import{aE as I,M as w,j as t,q as k,S as j,cy as x,cG as b,cF as g,cz as u,P as y,cV as _}from"./iframe-CXuq1bzX.js";import{w as m,c as A}from"./ContextDecorators-Ci1A41Sr.js";import{F as N,A as v}from"./FullførtStilling-KwXzlhnq.js";import{R as T}from"./GjenåpneStillingKnapp-Rc9O6Snt.js";import{T as E}from"./TilgangskontrollForInnhold-CzaMMYVB.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bx-AetdE.js";import"./OrganisasjonsnummerAlert-CY5A3vjK.js";import"./VStack-LqEsNTZZ.js";import"./BasePrimitive-DiKxr93y.js";import"./List-kturX9gN.js";import"./Link-7owy6tIO.js";import"./KandidatHendelseTag-DXzu7t6G.js";import"./Tag-Cida-Jzl.js";import"./ChatExclamationmark-CuSvMEE0.js";import"./FileXMark-C3mt0mpx.js";import"./Trash-DX_gXo3G.js";import"./HandShakeHeart-5A69Ghj1.js";import"./Calendar-BY4BLq7b.js";import"./ThumbUp-CflO1XuR.js";import"./Table-DY0KpqSI.js";import"./util-gTmey5Qo.js";import"./parse-DbkuHRKQ.js";import"./getDefaultOptions-DWOdFO_w.js";import"./parseISO-C2WOoNR9.js";import"./index-BQoksTIl.js";import"./index-B40KJ5b4.js";import"./isBefore-VEfq4mHQ.js";import"./util-yzhPM8cu.js";import"./accordion-Cx3wNenF.js";import"./index-B1k3w0Qw.js";import"./index-DEnUfMIw.js";import"./index-BtMmo8HM.js";import"./ChevronDown-DqTWyvcU.js";import"./Box-DfMN28z2.js";import"./Bell-Cg3a7gGh.js";import"./PersonChat-Vaebm1O1.js";import"./Eye-BLHrCppu.js";import"./ProgressBar-Dn4DqEnl.js";import"./EyeSlash-D6aII_AV.js";import"./CircleSlash-CPscxaVd.js";import"./Modal-f3KIdpQl.js";import"./floating-ui.react-CdZLdAlr.js";import"./Date.Input-Dr8BqPTN.js";import"./useFormField-C5bcbRvk.js";import"./useControllableState-Bofen_tQ.js";import"./Modal.context-g98g4FZE.js";import"./Checkbox-DNX4bsiB.js";import"./Fieldset-BSIsRQfI.js";import"./Pencil-qh2YCmtS.js";import"./PersonbrukerTekst-DNKBv6DG.js";import"./ClockDashed-1-Fv9gm2.js";import"./Tasklist-BlhNW-Es.js";import"./ErrorBoundary-BLUMwS9s.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ut as default};
